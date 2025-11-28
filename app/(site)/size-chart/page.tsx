"use client";
import Container from "@/app/_components/Container";
import Link from "next/link";

export default function SizeChartPage() {
  return (
    <Container className="py-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">Size Guide</h1>
        <p className="text-[#3b3b3b] max-w-2xl">
          Find your perfect fit with our comprehensive size guide. All
          measurements are in inches.
        </p>
      </div>

      {/* Men's Size Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">Men's Size Chart</h2>
        <div className="overflow-x-auto border border-grey">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 border-b-grey">
                <th className="px-4 py-3 text-left font-medium">Size</th>
                <th className="px-4 py-3 text-center font-medium">
                  Chest (in)
                </th>
                <th className="px-4 py-3 text-center font-medium">
                  Waist (in)
                </th>
                <th className="px-4 py-3 text-center font-medium">Hips (in)</th>
                <th className="px-4 py-3 text-center font-medium">
                  Shoulder (in)
                </th>
                <th className="px-4 py-3 text-center font-medium">
                  Sleeve (in)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">XS</td>
                <td className="px-4 py-3 text-center">32-34</td>
                <td className="px-4 py-3 text-center">26-28</td>
                <td className="px-4 py-3 text-center">34-36</td>
                <td className="px-4 py-3 text-center">16-17</td>
                <td className="px-4 py-3 text-center">32-33</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">S</td>
                <td className="px-4 py-3 text-center">34-36</td>
                <td className="px-4 py-3 text-center">28-30</td>
                <td className="px-4 py-3 text-center">36-38</td>
                <td className="px-4 py-3 text-center">17-18</td>
                <td className="px-4 py-3 text-center">33-34</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">M</td>
                <td className="px-4 py-3 text-center">36-38</td>
                <td className="px-4 py-3 text-center">30-32</td>
                <td className="px-4 py-3 text-center">38-40</td>
                <td className="px-4 py-3 text-center">18-19</td>
                <td className="px-4 py-3 text-center">34-35</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">L</td>
                <td className="px-4 py-3 text-center">38-40</td>
                <td className="px-4 py-3 text-center">32-34</td>
                <td className="px-4 py-3 text-center">40-42</td>
                <td className="px-4 py-3 text-center">19-20</td>
                <td className="px-4 py-3 text-center">35-36</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">XL</td>
                <td className="px-4 py-3 text-center">40-42</td>
                <td className="px-4 py-3 text-center">34-36</td>
                <td className="px-4 py-3 text-center">42-44</td>
                <td className="px-4 py-3 text-center">20-21</td>
                <td className="px-4 py-3 text-center">36-37</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">XXL</td>
                <td className="px-4 py-3 text-center">42-44</td>
                <td className="px-4 py-3 text-center">36-38</td>
                <td className="px-4 py-3 text-center">44-46</td>
                <td className="px-4 py-3 text-center">21-22</td>
                <td className="px-4 py-3 text-center">37-38</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Women's Size Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">Women's Size Chart</h2>
        <div className="overflow-x-auto border border-grey">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 border-b-grey">
                <th className="px-4 py-3 text-left font-medium">Size</th>
                <th className="px-4 py-3 text-center font-medium">Bust (in)</th>
                <th className="px-4 py-3 text-center font-medium">
                  Waist (in)
                </th>
                <th className="px-4 py-3 text-center font-medium">Hips (in)</th>
                <th className="px-4 py-3 text-center font-medium">
                  Shoulder (in)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">XS</td>
                <td className="px-4 py-3 text-center">30-32</td>
                <td className="px-4 py-3 text-center">24-26</td>
                <td className="px-4 py-3 text-center">32-34</td>
                <td className="px-4 py-3 text-center">14-15</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">S</td>
                <td className="px-4 py-3 text-center">32-34</td>
                <td className="px-4 py-3 text-center">26-28</td>
                <td className="px-4 py-3 text-center">34-36</td>
                <td className="px-4 py-3 text-center">15-16</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">M</td>
                <td className="px-4 py-3 text-center">34-36</td>
                <td className="px-4 py-3 text-center">28-30</td>
                <td className="px-4 py-3 text-center">36-38</td>
                <td className="px-4 py-3 text-center">16-17</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">L</td>
                <td className="px-4 py-3 text-center">36-38</td>
                <td className="px-4 py-3 text-center">30-32</td>
                <td className="px-4 py-3 text-center">38-40</td>
                <td className="px-4 py-3 text-center">17-18</td>
              </tr>
              <tr className="border-b border-b-grey">
                <td className="px-4 py-3 font-medium">XL</td>
                <td className="px-4 py-3 text-center">38-40</td>
                <td className="px-4 py-3 text-center">32-34</td>
                <td className="px-4 py-3 text-center">40-42</td>
                <td className="px-4 py-3 text-center">18-19</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">XXL</td>
                <td className="px-4 py-3 text-center">40-42</td>
                <td className="px-4 py-3 text-center">34-36</td>
                <td className="px-4 py-3 text-center">42-44</td>
                <td className="px-4 py-3 text-center">19-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Measure */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-6">How to Measure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-grey p-6">
            <h3 className="font-medium mb-3">Chest / Bust</h3>
            <p className="text-[#3b3b3b] text-sm">
              Measure under your arms around the fullest part of your
              chest/bust. Keep the tape level and ensure it goes over your
              shoulder blades.
            </p>
          </div>
          <div className="border border-grey p-6">
            <h3 className="font-medium mb-3">Waist</h3>
            <p className="text-[#3b3b3b] text-sm">
              Measure around the slimmest part of your natural waistline,
              keeping one finger between the tape and your body for a
              comfortable fit.
            </p>
          </div>
          <div className="border border-grey p-6">
            <h3 className="font-medium mb-3">Hips</h3>
            <p className="text-[#3b3b3b] text-sm">
              Stand with your heels touching. Measure around the widest part of
              your hips, keeping the tape level and straight.
            </p>
          </div>
          <div className="border border-grey p-6">
            <h3 className="font-medium mb-3">Shoulder</h3>
            <p className="text-[#3b3b3b] text-sm">
              Measure from the edge of one shoulder across the back to the edge
              of the other shoulder. The tape should pass across the top of your
              shoulder blades.
            </p>
          </div>
          <div className="border border-grey p-6">
            <h3 className="font-medium mb-3">Sleeve Length</h3>
            <p className="text-[#3b3b3b] text-sm">
              With your arm slightly bent, measure from the center back of your
              neck, across your shoulder, down to your wrist.
            </p>
          </div>
          <div className="border border-grey p-6">
            <h3 className="font-medium mb-3">Inseam</h3>
            <p className="text-[#3b3b3b] text-sm">
              Measure from the top of your inner thigh down to your ankle bone.
              This is best done while wearing shoes.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12 border border-grey p-6">
        <h2 className="text-xl font-medium mb-4">Measurement Tips</h2>
        <ul className="space-y-3 text-[#3b3b3b] text-sm">
          <li className="flex gap-2">
            <span className="shrink-0">•</span>
            <span>
              Always measure over your undergarments or form-fitting clothing
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">•</span>
            <span>Keep the measuring tape parallel to the floor</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">•</span>
            <span>
              Don't pull the tape too tight - it should be snug but comfortable
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">•</span>
            <span>
              For the most accurate measurements, have someone else take them
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">•</span>
            <span>
              If you're between sizes, we recommend sizing up for a more
              comfortable fit
            </span>
          </li>
        </ul>
      </section>

      {/* Custom Fit CTA */}
      <section className="text-center border border-grey p-8">
        <h2 className="text-2xl font-medium mb-3">Need a Custom Fit?</h2>
        <p className="text-[#3b3b3b] mb-6 max-w-2xl mx-auto">
          Can't find your size or need a perfect custom fit? Create a
          measurement profile and we'll tailor each piece to your exact
          specifications.
        </p>
        <Link
          href="/account/measurements"
          className="inline-block px-8 py-3 bg-[#121212] text-white hover:bg-[#2a2a2a] transition-colors"
        >
          Create Measurement Profile
        </Link>
      </section>
    </Container>
  );
}
