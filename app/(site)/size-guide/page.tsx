"use client";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import Link from "next/link";
import React from "react";

export default function SizeChartPage() {
  return (
    <React.Fragment>
      <Container className="py-12 max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl text-center sm:text-4xl font-medium mb-8">
          Size Guide
        </h1>

        <section className="mb-12">
          <div className="overflow-x-auto border border-grey rounded-xs">
            <table className="min-w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b bg-gray-50 border-b-grey">
                  <th className="px-4 py-3 text-left font-medium"></th>
                  <th className="px-4 py-3 text-center font-medium">XS</th>
                  <th className="px-4 py-3 text-center font-medium">S</th>
                  <th className="px-4 py-3 text-center font-medium">M</th>
                  <th className="px-4 py-3 text-center font-medium">L</th>
                  <th className="px-4 py-3 text-center font-medium">XL</th>
                  <th className="px-4 py-3 text-center font-medium">2XL</th>
                  <th className="px-4 py-3 text-center font-medium">3XL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-b-grey">
                  <td className="px-4 py-3 font-medium">Chest (in)</td>
                  <td className="px-4 py-3 text-center">32-34</td>
                  <td className="px-4 py-3 text-center">34-36</td>
                  <td className="px-4 py-3 text-center">36-38</td>
                  <td className="px-4 py-3 text-center">38-40</td>
                  <td className="px-4 py-3 text-center">40-42</td>
                  <td className="px-4 py-3 text-center">42-44</td>
                  <td className="px-4 py-3 text-center">44-46</td>
                </tr>
                <tr className="border-b border-b-grey">
                  <td className="px-4 py-3 font-medium">Waist (in)</td>
                  <td className="px-4 py-3 text-center">26-28</td>
                  <td className="px-4 py-3 text-center">28-30</td>
                  <td className="px-4 py-3 text-center">30-32</td>
                  <td className="px-4 py-3 text-center">32-34</td>
                  <td className="px-4 py-3 text-center">34-36</td>
                  <td className="px-4 py-3 text-center">36-38</td>
                  <td className="px-4 py-3 text-center">38-40</td>
                </tr>
                <tr className="border-b border-b-grey">
                  <td className="px-4 py-3 font-medium">Hips (in)</td>
                  <td className="px-4 py-3 text-center">34-36</td>
                  <td className="px-4 py-3 text-center">36-38</td>
                  <td className="px-4 py-3 text-center">38-40</td>
                  <td className="px-4 py-3 text-center">40-42</td>
                  <td className="px-4 py-3 text-center">42-44</td>
                  <td className="px-4 py-3 text-center">44-46</td>
                  <td className="px-4 py-3 text-center">46-48</td>
                </tr>
                <tr className="border-b border-b-grey">
                  <td className="px-4 py-3 font-medium">Shoulder (in)</td>
                  <td className="px-4 py-3 text-center">16-17</td>
                  <td className="px-4 py-3 text-center">17-18</td>
                  <td className="px-4 py-3 text-center">18-19</td>
                  <td className="px-4 py-3 text-center">19-20</td>
                  <td className="px-4 py-3 text-center">20-21</td>
                  <td className="px-4 py-3 text-center">21-22</td>
                  <td className="px-4 py-3 text-center">22-23</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Sleeve (in)</td>
                  <td className="px-4 py-3 text-center">32-33</td>
                  <td className="px-4 py-3 text-center">33-34</td>
                  <td className="px-4 py-3 text-center">34-35</td>
                  <td className="px-4 py-3 text-center">35-36</td>
                  <td className="px-4 py-3 text-center">36-37</td>
                  <td className="px-4 py-3 text-center">37-38</td>
                  <td className="px-4 py-3 text-center">38-39</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Measure */}
        <section className="">
          <h2 className="text-2xl font-medium mb-4">How to Measure</h2>
          <Container.Row>
            <Container.Row.Column className="md:w-1/2">
              <h3 className="font-medium text-lg mb-1">Chest</h3>
              <p className="text-[#3b3b3b] text-sm">
                Measure under your arms around the fullest part of your chest.
                Keep the tape level and ensure it goes over your shoulder
                blades.
              </p>
            </Container.Row.Column>
            <Container.Row.Column className="md:w-1/2">
              <h3 className="font-medium text-lg mb-1">Waist</h3>
              <p className="text-[#3b3b3b] text-sm">
                Measure around the slimmest part of your natural waistline,
                keeping one finger between the tape and your body for a
                comfortable fit.
              </p>
            </Container.Row.Column>
            <Container.Row.Column className="md:w-1/2">
              <h3 className="font-medium text-lg mb-1">Hips</h3>
              <p className="text-[#3b3b3b] text-sm">
                Stand with your heels touching. Measure around the widest part
                of your hips, keeping the tape level and straight.
              </p>
            </Container.Row.Column>
            <Container.Row.Column className="md:w-1/2">
              <h3 className="font-medium text-lg mb-1">Sleeve</h3>
              <p className="text-[#3b3b3b] text-sm">
                With your arm slightly bent, measure from the center back of
                your neck, across your shoulder, down to your wrist.
              </p>
            </Container.Row.Column>
            <Container.Row.Column className="md:w-1/2">
              <h3 className="font-medium text-lg mb-1">Shoulder</h3>
              <p className="text-[#3b3b3b] text-sm">
                Measure from the edge of one shoulder across the back to the
                edge of the other shoulder. The tape should pass across the top
                of your shoulder blades.
              </p>
            </Container.Row.Column>
            <Container.Row.Column className="md:w-1/2">
              <h3 className="font-medium text-lg mb-1">Tips</h3>
              <ul className="list-disc list-inside text-[#3b3b3b] text-sm space-y-1">
                <li>Use a flexible measuring tape for accuracy.</li>
                <li>Measure yourself while wearing minimal clothing.</li>
                <li>
                  Ask for assistance if you find it difficult to measure
                  yourself.
                </li>
              </ul>
            </Container.Row.Column>
          </Container.Row>
        </section>
      </Container>

      {/* Custom Measurement CTA */}
      <section className="text-center bg-gray-50 py-12 px-4">
        <h2 className="text-2xl font-medium mb-3">
          Need a Custom Measurement?
        </h2>
        <p className="text-[#3b3b3b] mb-6 max-w-xl mx-auto">
          Create a measurement profile and we'll tailor each piece to your
          precise fit.
        </p>
        <div className="flex justify-center">
          <Link href="/account/measurements">
            <Button>Create profile</Button>
          </Link>
        </div>
      </section>
    </React.Fragment>
  );
}
