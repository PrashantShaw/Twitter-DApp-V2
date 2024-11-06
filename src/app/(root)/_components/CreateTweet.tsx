"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCreateTweet from "@/hooks/useCreateTweet";
import React, { useCallback, useEffect, useRef } from "react";

const CreateTweet = () => {
  const { isTriggeringWrite, isConfirming, isConfirmed, createTweet } =
    useCreateTweet();
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formElem = e.currentTarget;
      const formData = new FormData(formElem);
      const tweet = formData.get("tweet")?.toString() ?? "";

      if (tweet.trim().length === 0) return;

      createTweet(tweet);
    },
    [createTweet]
  );
  useEffect(() => {
    if (isConfirmed) {
      formRef.current?.reset();
    }
  }, [isConfirmed]);
  const isDisabled = isTriggeringWrite || isConfirming;
  return (
    <div className="pt-6 pb-2">
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <Textarea name="tweet" placeholder="What's on your mind?" rows={6} />
          <Button
            className="w-[8rem]"
            variant={"default"}
            disabled={isDisabled}
          >
            {isDisabled ? "Confirming..." : "Tweet"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
