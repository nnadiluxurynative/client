"use client";
import { useOrdersStore } from "@/app/_stores/orderStore";
import { formatNaira } from "@/app/_utils/helpers";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import Container from "@/app/_components/Container";
import Link from "next/link";

function page() {
  const { ref } = useParams<{ ref: string }>();
  const { getOrder } = useOrdersStore();

  const order = getOrder(ref);

  const subtotal = Number(
    order?.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
  );

  const shippingFee = Number(order?.total) - Number(subtotal);

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl text-center sm:text-4xl font-medium">
          Account
        </h2>
        <Link className="link--underline" href="/account">
          Return to account details
        </Link>
      </div>

      {order ? (
        <Container.Row className="mt-8">
          <Container.Row.Column className="md:w-3/4 flex flex-col">
            <div className="mb-4">
              <h3 className="font-medium text-2xl">Order #{ref}</h3>
              <p className="mt-1 text-sm">
                Placed on{" "}
                <span>
                  {format(
                    new Date(order.createdAt),
                    "MMM dd, yyyy 'at' HH:mma"
                  )}
                </span>
              </p>
            </div>
            <div>
              <div className="overflow-x-auto border border-grey rounded-xs">
                <table className="min-w-full text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b bg-gray-50 border-b-grey text-left text-xs uppercase tracking-wide ">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Material</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">Quantity</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i} className="border-b-grey not-last:border-b">
                        <td className="px-4 py-3 font-medium">
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="hover:underline"
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3">{item.material}</td>
                        <td className="px-4 py-3 text-right">
                          {formatNaira(item.price)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatNaira(Number(item.quantity * item.price))}
                        </td>
                      </tr>
                    ))}
                    <tr></tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 border flex flex-col gap-2 border-grey border-t-0">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>

                  <span>
                    {shippingFee === 0
                      ? "Free shipping"
                      : formatNaira(shippingFee)}
                  </span>
                </div>
                <div className="flex mt-1 items-center text-xl font-medium justify-between">
                  <span>Total</span>
                  <span>{formatNaira(order.total)} NGN</span>
                </div>
              </div>
            </div>
          </Container.Row.Column>
          <Container.Row.Column className="md:w-1/4 flex flex-col">
            <h3 className="font-medium text-2xl mb-4">Shipping address</h3>
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="">{order.status}</span>
              </p>
              <p>
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <p className="capitalize">{order.shippingAddress.address}</p>
              <p className="capitalize">
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </Container.Row.Column>
        </Container.Row>
      ) : (
        <div>Order not found</div>
      )}
    </div>
  );
}

export default page;
