"use client";
// External libraries
import Link from "next/link";
import { BiHelpCircle } from "react-icons/bi";
import { useEffect, useState } from "react";

import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import Modal from "@/app/_components/modal/Modal";
import Steps from "@/app/_components/steps/Steps";
import AddMeasurementModal from "@/app/_components/measurements/AddMeasurementModal";

// State and stores
import { useAuthStore } from "@/app/_stores/authStore";

/**
 * Measurements page
 *
 * Displays a list of the user's saved measurement profiles and exposes
 * actions to add, edit, or delete profiles. Measurement profiles are
 * ordered with any default profile(s) shown first.
 */
function page() {
  // Retrieve authenticated user (zustand store)
  const { user } = useAuthStore();

  // Prepare measurements array and sort so default profile(s) appear first.
  // Using `?? []` ensures we always have an array to render safely.
  const measurements = (user?.measurements ?? []).sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return 0;
  });

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 3; // requested page size

  const totalPages = Math.max(1, Math.ceil(measurements.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedMeasurements = measurements.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Keep `page` within valid bounds when measurements change
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
    if (page < 1) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl text-center sm:text-4xl font-medium">
          Measurements
        </h2>
        <div>
          <Link className="link--underline" href="/account">
            Return to account details
          </Link>
        </div>
      </div>
      <Modal>
        {/* Add measurement button */}
        <div className="flex flex-col justify-center gap-2 mt-6 items-center">
          <Modal.Open opens="add-measurement">
            <Button className="text-center">Add profile</Button>
          </Modal.Open>
          <button className="text-sm flex items-center cursor-pointer gap-1">
            <BiHelpCircle size={16} className="mt-px" />
            <span className="link--underline">Measurement guide</span>
          </button>
        </div>
        {/* Render measurements when present (default-first ordering applied above) */}
        {measurements && (
          <Container.Row className="mt-6">
            <Container.Row.Column className="max-w-[450px] flex flex-col mx-auto">
              {/* Render measurement profiles */}
              {paginatedMeasurements.map((profile, i) => (
                <div key={i} className="p-4 flex flex-col text-center gap-1">
                  {profile.isDefault && (
                    <h3 className="text-xl font-medium">Default</h3>
                  )}
                  <table className="max-w-[250px] mx-auto w-full">
                    <tbody>
                      <tr>
                        <td className="text-left p-0.5 font-medium">Name</td>
                        <td className="p-0.5 text-right">{profile.name}</td>
                      </tr>
                      <tr>
                        <td className="p-0.5 font-medium text-left">Height</td>
                        <td className="p-0.5 text-right">
                          {profile.details.body.height} {profile.details.unit}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-0.5 font-medium text-left">Chest</td>
                        <td className="text-right p-0.5">
                          {profile.details.top.chest} {profile.details.unit}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-0.5 font-medium text-left">Waist</td>
                        <td className="text-right p-0.5">
                          {profile.details.trouser.waist} {profile.details.unit}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center gap-3 mt-4">
                    {/* Edit measurement button */}
                    <Modal.Open opens="edit-measurement">
                      <Button color="white">Edit</Button>
                    </Modal.Open>
                    {/* Delete measurement button */}
                    <Modal.Open opens="delete-measurement">
                      <Button color="white">Delete</Button>
                    </Modal.Open>
                  </div>
                </div>
              ))}
              {/* Pagination controls */}
              {measurements.length > PAGE_SIZE && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    Prev
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pNum = idx + 1;
                      return (
                        <button
                          key={pNum}
                          onClick={() => setPage(pNum)}
                          className={`px-2 py-1 rounded ${
                            pNum === page ? "bg-gray-800 text-white" : "border"
                          }`}
                          aria-current={pNum === page ? "page" : undefined}
                        >
                          {pNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
              {/* Modals */}
            </Container.Row.Column>
          </Container.Row>
        )}
        {/* Add measurement modal */}
        <Steps>
          <AddMeasurementModal />
        </Steps>
      </Modal>
    </div>
  );
}

export default page;
