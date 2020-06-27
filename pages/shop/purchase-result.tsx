import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { connect } from "react-redux";
import { checkoutAction } from "../../store/shoppingBag";

async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

interface PurchaseResultPageProps {
  /** The addProduct function will empty the shopping bag. */
  readonly checkout: Function;
}

const PurchaseResultPage: NextPage<PurchaseResultPageProps> = ({
  checkout
}) => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (data?.payment_intent?.status === "succeeded") {
    checkout();
  }

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

const mapDispatchToProps = {
  checkout: checkoutAction
};

const PurchaseResultPageConnected = connect(
  null,
  mapDispatchToProps
)(PurchaseResultPage);

export default PurchaseResultPageConnected;
