import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Types "../types/viewing-requests";

module {
  public func validate(input : Types.ViewingRequestInput) : [Types.ValidationError] {
    let errors = List.empty<Types.ValidationError>();
    if (input.name.trim(#char ' ').isEmpty()) { errors.add(#nameRequired) };
    if (input.email.trim(#char ' ').isEmpty()) {
      errors.add(#emailRequired);
    } else if (not isValidEmail(input.email.trim(#char ' '))) {
      errors.add(#emailInvalid);
    };
    if (input.phone.trim(#char ' ').isEmpty()) { errors.add(#phoneRequired) };
    if (input.preferredDate.trim(#char ' ').isEmpty()) { errors.add(#preferredDateRequired) };
    if (input.message.trim(#char ' ').isEmpty()) { errors.add(#messageRequired) };
    errors.toArray();
  };

  public func submit(
    requests : List.List<Types.ViewingRequest>,
    state : { var nextRequestId : Nat },
    input : Types.ViewingRequestInput,
  ) : Types.SubmitResult {
    let errors = validate(input);
    if (errors.size() > 0) {
      return #err(errors);
    };
    let id = state.nextRequestId;
    state.nextRequestId := id + 1;
    let request : Types.ViewingRequest = {
      id;
      name = input.name.trim(#char ' ');
      email = input.email.trim(#char ' ');
      phone = input.phone.trim(#char ' ');
      preferredDate = input.preferredDate.trim(#char ' ');
      message = input.message.trim(#char ' ');
      submittedAt = Time.now();
    };
    requests.add(request);
    #ok(request);
  };

  public func listRequests(requests : List.List<Types.ViewingRequest>) : [Types.ViewingRequest] {
    requests.toArray();
  };

  func isValidEmail(email : Text) : Bool {
    let parts = email.split(#char '@').toArray();
    if (parts.size() != 2) { return false };
    let local = parts[0];
    let domain = parts[1];
    local.size() > 0 and domain.size() > 0 and domain.contains(#text ".");
  };
};
