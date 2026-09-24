import { createActor } from "@/backend";
import type { SubmitResult, ViewingRequestInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";

/**
 * Submits a private viewing request to the studio.
 *
 * The backend returns a `SubmitResult` union rather than throwing, so the
 * caller inspects `__kind__` to distinguish success from field-level
 * validation errors. The mutation itself only rejects on transport failure.
 */
export function useSubmitViewingRequest() {
  const { actor } = useActor(createActor);

  return useMutation<SubmitResult, Error, ViewingRequestInput>({
    mutationFn: async (input: ViewingRequestInput) => {
      if (!actor) throw new Error("The studio is not reachable right now.");
      return actor.submitViewingRequest(input);
    },
  });
}
