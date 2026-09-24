import Common "common";

module {
  public type RequestId = Common.RequestId;
  public type Timestamp = Common.Timestamp;

  public type ViewingRequest = {
    id : RequestId;
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    message : Text;
    submittedAt : Timestamp;
  };

  public type ViewingRequestInput = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    message : Text;
  };

  public type ValidationError = {
    #nameRequired;
    #emailRequired;
    #emailInvalid;
    #phoneRequired;
    #preferredDateRequired;
    #messageRequired;
  };

  public type SubmitResult = {
    #ok : ViewingRequest;
    #err : [ValidationError];
  };
};
