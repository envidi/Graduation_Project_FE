import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const PayMethodSelector = ({
  handleUserPaymentMethod,
  userPayMethod,
}: {
  handleUserPaymentMethod: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userPayMethod: string;
}) => {
  const checkedColor = (val: string) => {
    return {
      backgroundColor: val === userPayMethod ? "#ef5e78" : "",
      border: val === userPayMethod ? "2px solid transparent" : "",
    };
  };
  return (
    <div>
      <form >
        <div className="form-item-heading">Select Payment Method</div>
        <div className="form-pay-options">
          <div
            className="pay-input-container"
            key="Bkash"
            style={checkedColor("Bkash")}
          >
            <Input
              type="radio"
              id={`${1}`}
              name="Select Payment"
              value="Bkash"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Bkash" === userPayMethod}
            />

            <Label className="form-pay-detail" htmlFor={"Bkash"}>
              Bkash
            </Label>
          </div>

          <div
            className="pay-input-container"
            key="Nagad"
            style={checkedColor("Nagad")}
          >
            <Input
              type="radio"
              id={`${2}`}
              name="Select Payment"
              value="Nagad"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Nagad" === userPayMethod}
            />

            <Label className="form-pay-detail" htmlFor={"Nagad"}>
              Nagad
            </Label>
          </div>

          <div
            className="pay-input-container"
            key="Credit Card"
            style={checkedColor("Credit Card")}
          >
            <Input
              type="radio"
              id={`${3}`}
              name="Select Payment"
              value="Credit Card"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Credit Card" === userPayMethod}
            />

            <Label className="form-pay-detail" htmlFor={"Credit Card"}>
              Credit Card
            </Label>
          </div>

          <div
            className="pay-input-container"
            key="Debit Card"
            style={checkedColor("Debit Card")}
          >
            <Input
              type="radio"
              id={`${4}`}
              name="Select Payment"
              value="Debit Card"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Debit Card" === userPayMethod}
            />

            <Label className="form-pay-detail" htmlFor={"Debit Card"}>
              Debit Card
            </Label>
          </div>
        </div>
      </form>
    </div>
  );
};