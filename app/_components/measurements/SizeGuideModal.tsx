"use client";
import Link from "next/link";
import Accordion from "../Accordion";
import Modal from "../modal/Modal";
import { useModalContext } from "../modal/ModalContext";

export default function SizeGuideModal() {
  const { close } = useModalContext();
  return (
    <Modal.Window
      title="Size Guide"
      name="size-guide"
      className="sm:max-w-[850px]"
    >
      <div className="">
        {/* Size Chart */}
        <div className="overflow-x-auto">
          <div className="overflow-x-auto border border-grey">
            <table className="min-w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b bg-gray-50 border-b-grey text-left text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left"></th>
                  <th className="px-4 py-3 text-center">XS</th>
                  <th className="px-4 py-3 text-center">S</th>
                  <th className="px-4 py-3 text-center">M</th>
                  <th className="px-4 py-3 text-center">L</th>
                  <th className="px-4 py-3 text-center">XL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-grey border-b">
                  <td className="px-4 py-3 font-medium text-left">
                    Chest (in)
                  </td>
                  <td className="py-3 px-4 text-center">32-34</td>
                  <td className="py-3 px-4 text-center">34-36</td>
                  <td className="py-3 px-4 text-center">36-38</td>
                  <td className="py-3 px-4 text-center">38-40</td>
                  <td className="py-3 px-4 text-center">40-42</td>
                </tr>
                <tr className="border-b border-b-grey">
                  <td className="py-3 px-4 font-medium text-left">
                    Waist (in)
                  </td>
                  <td className="py-3 px-4 text-center">26-28</td>
                  <td className="py-3 px-4 text-center">28-30</td>
                  <td className="py-3 px-4 text-center">30-32</td>
                  <td className="py-3 px-4 text-center">32-34</td>
                  <td className="py-3 px-4 text-center">34-36</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-left">Hips (in)</td>
                  <td className="py-3 px-4 text-center">34-36</td>
                  <td className="py-3 px-4 text-center">36-38</td>
                  <td className="py-3 px-4 text-center">38-40</td>
                  <td className="py-3 px-4 text-center">40-42</td>
                  <td className="py-3 px-4 text-center">42-44</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Accordion className="mt-8">
          <Accordion.Item
            idx={0}
            item={{
              question: "Measurement Guide",
              answer: (
                <div>
                  <div className="mb-3">
                    <h3 className="font-medium mb-0.5">Chest</h3>
                    <p>
                      Measure under your arms around the fullest part of your
                      chest. Be sure to go over your shoulder blades.
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="font-medium mb-0.5">Waist</h3>
                    <p>
                      Measure around the slimmest part of your waist, keeping
                      one finger between the tape and your body.
                    </p>
                  </div>
                  <div className="mb-3">
                    <h3 className="font-medium mb-0.5">Hips</h3>
                    <p>
                      Stand with your heels touching, keeping the tape level and
                      straight. Measure around the widest part of your hips.
                    </p>
                  </div>
                </div>
              ),
            }}
          />
        </Accordion>

        {/* Custom Option */}
        <div className="p-4 bg-gray-50 mt-6 text-center">
          <p className="text-sm">
            <span className="font-medium">Need a custom fit?</span> Create a
            measurement profile in your{" "}
            <Link
              onClick={close}
              href="/account/measurements"
              className="link--underline"
            >
              account
            </Link>{" "}
            for a perfectly tailored garment.
          </p>
        </div>
      </div>
    </Modal.Window>
  );
}
