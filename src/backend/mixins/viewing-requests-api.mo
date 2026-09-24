import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/viewing-requests";
import ViewingRequestsLib "../lib/viewing-requests";

mixin (
  accessControlState : AccessControl.AccessControlState,
  requests : List.List<Types.ViewingRequest>,
  state : { var nextRequestId : Nat },
) {
  public shared func submitViewingRequest(input : Types.ViewingRequestInput) : async Types.SubmitResult {
    ViewingRequestsLib.submit(requests, state, input)
  };

  public query ({ caller }) func listViewingRequests() : async [Types.ViewingRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the studio owner can view requests");
    };
    ViewingRequestsLib.listRequests(requests);
  };
};
