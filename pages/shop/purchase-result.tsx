import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const PurchaseResultPage: NextPage = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>Failed to load.</div>;

  // TODO: If purchase was a success, nuke shoppingBag state + localStorage

  return (
    <div>
      <h1>Checkout Payment Result</h1>
      <h2>Status: {data?.payment_intent?.status ?? "Loading..."}</h2>
      <h3>CheckoutSession response:</h3>
      <div>{JSON.stringify(data ?? "Loading...")}</div>
    </div>
  );
};

export default PurchaseResultPage;
