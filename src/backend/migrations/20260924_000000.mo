import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type OldActor = {};

  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type ViewingRequest = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    message : Text;
    submittedAt : Int;
  };

  type NewActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, UserRole>;
    };
    viewingRequests : List.List<ViewingRequest>;
    viewingRequestState : { var nextRequestId : Nat };
  };

  public func migration(_old : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      viewingRequests = List.empty();
      viewingRequestState = { var nextRequestId = 0 };
    };
  };
};
