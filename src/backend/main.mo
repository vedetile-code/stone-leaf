import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import ListEntity "mo:caffeineai-oql/ListEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import ViewingRequestTypes "types/viewing-requests";
import ViewingRequestsApi "mixins/viewing-requests-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let viewingRequests : List.List<ViewingRequestTypes.ViewingRequest>;
  let viewingRequestState : { var nextRequestId : Nat };

  include ViewingRequestsApi(accessControlState, viewingRequests, viewingRequestState);

  include ApiDocMixin();

  include Expose({
    entities = [
      viewingRequests.toEntity("viewingRequest", "ViewingRequest", "id")
        .sample({
          id = 0;
          name = "";
          email = "";
          phone = "";
          preferredDate = "";
          message = "";
          submittedAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
