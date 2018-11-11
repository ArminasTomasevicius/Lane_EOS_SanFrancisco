#include "example.hpp"


ACTION example::setprofile(name user, std::string firstName) {

    require_auth( user );

    auto existing_profile = _profiles.find( user.value );

    if(existing_profile != _profiles.end()) {

      _profiles.modify( existing_profile, _self, [&]( auto& rcrd ) {
         rcrd.firstName = firstName;
      });

    } else {

      _profiles.emplace( _self, [&]( auto& rcrd ) {
         rcrd.user      = user;
         rcrd.firstName = firstName;
      });

    }

    send_summary(user, " successfully set profile");

}

ACTION token::create(account_name issuer, asset maximum_supply)
{
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( maximum_supply.is_valid(), "invalid supply");
    eosio_assert( maximum_supply.amount > 0, "max-supply must be positive");

    stats statstable( _self, sym.name() );
    auto existing = statstable.find( sym.name() );
    eosio_assert( existing == statstable.end(), "token with symbol already exists" );

    statstable.emplace( _self, [&]( auto& s ) {
       s.supply.symbol = maximum_supply.symbol;
       s.max_supply    = maximum_supply;
       s.issuer        = issuer;
    });
}


ACTION token::issue(account_name to, asset quantity, string memo)
{
    auto sym = quantity.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    auto sym_name = sym.name();
    stats statstable( _self, sym_name );
    auto existing = statstable.find( sym_name );
    eosio_assert( existing != statstable.end(), "token with symbol does not exist, create token before issue" );
    const auto& st = *existing;

    require_auth( st.issuer );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must issue positive quantity" );

    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify( st, 0, [&]( auto& s ) {
       s.supply += quantity;
    });

    add_balance( st.issuer, quantity, st.issuer );

    if( to != st.issuer ) {
       SEND_INLINE_ACTION( *this, transfer, {st.issuer,N(active)}, {st.issuer, to, quantity, memo} );
    }
}

ACTION token::transfer(account_name from, account_name to, asset quantity, string memo)
{
    eosio_assert( from != to, "cannot transfer to self" );
    require_auth( from );
    eosio_assert( is_account( to ), "to account does not exist");
    auto sym = quantity.symbol.name();
    stats statstable( _self, sym );
    const auto& st = statstable.get( sym );

    require_recipient( from );
    require_recipient( to );

    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );


    sub_balance( from, quantity );
    add_balance( to, quantity, from );
}

ACTION token::sub_balance(account_name owner, asset value) {
   accounts from_acnts( _self, owner );

   const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );


   if( from.balance.amount == value.amount ) {
      from_acnts.erase( from );
   } else {
      from_acnts.modify( from, owner, [&]( auto& a ) {
          a.balance -= value;
      });
   }
}

ACTION token::add_balance(account_name owner, asset value, account_name ram_payer)
{
   accounts to_acnts( _self, owner );
   auto to = to_acnts.find( value.symbol.name() );
   if( to == to_acnts.end() ) {
      to_acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = value;
      });
   } else {
      to_acnts.modify( to, 0, [&]( auto& a ) {
        a.balance += value;
      });
   }
}

}

ACTION example::addskill(name user, std::string skill) {

    require_auth( user );

    skils_table skills( _self, user.value );

    auto existing_profile = _profiles.find( user.value );
    eosio_assert( existing_profile != _profiles.end(), "profile doesnt exist" );

    bool exist = false;
    for ( auto itr = skills.begin(); itr != skills.end(); itr++ ) {
        if(skill.compare(itr->skill) == 0) {
            exist = true;
            break;
        }
    }
    if(!exist) {

        skills.emplace( _self, [&]( auto& rcrd ) {
            rcrd.key    = skills.available_primary_key();
            rcrd.skill  = skill;
        });

    }

    send_summary(user, " successfully added skill");

}

/*
Remove a user.
    Only contract owner can do this.
*/
ACTION example::rmprofile(name user) {

    require_auth( _self );
    require_recipient( user ); // is_account ??

    auto existing_profile = _profiles.find( user.value );

    eosio_assert(existing_profile != _profiles.end(), "Profile does not exist");

    _profiles.erase(existing_profile);

    send_summary(user, " successfully deleted profile");

}

ACTION example::notify(name user, std::string msg) {
    require_auth(get_self());
    require_recipient(user);
}


void example::send_summary(name user, std::string message) {
    action(
      permission_level{get_self(),"active"_n},
      get_self(),
      "notify"_n,
      std::make_tuple(user, name{user}.to_string() + message)
    ).send();
};

EOSIO_DISPATCH( example, (setprofile)(addskill)(rmprofile)(notify)(create)(issue)(transfer))
