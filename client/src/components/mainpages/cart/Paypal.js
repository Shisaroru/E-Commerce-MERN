import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal({ total, tranSuccess }) {
    const clientID = 'Ac8Q-cRtDgGetOhWZ_NzRNk_yD04w--8ZP8OrP9pTMeEUEPzMsVoSc9UuZ0FE1ae4uP41c_lcNmbC3dp'

    return (
        <PayPalScriptProvider options={{ "client-id": clientID }}>
            <PayPalButtons
                forceReRender={[total]} // re-render button since it's not re-render while state change
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        tranSuccess(details)
                    });
                }}
            ><p>{total}</p></PayPalButtons>
        </PayPalScriptProvider>
    );
}