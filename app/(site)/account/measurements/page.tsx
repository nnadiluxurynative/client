"use client";
// External libraries
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import AddMeasurementModal from "@/app/_components/measurements/AddMeasurementModal";
import Modal from "@/app/_components/modal/Modal";
import Steps from "@/app/_components/steps/Steps";

// State and stores
import DeleteMeasurementModal from "@/app/_components/measurements/DeleteMeasurementModal";
import { useAuthStore } from "@/app/_stores/authStore";
import { Measurement } from "@/app/_types/measurement";
import EditMeasurementModal from "@/app/_components/measurements/EditMeasurementModal";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

/**
 * Measurements page
 *
 */
function page() {
  // Retrieve authenticated user
  const { user } = useAuthStore();

  // Address to modify
  const [measurement, setMeasurement] = useState<Measurement | null>(null);

  // Prepare measurements array and sort so default profile(s) appear first.
  const measurements = (user?.measurements ?? []).sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return 0;
  });

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 2; // requested page size

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
            <Button className="text-center">Create profile</Button>
          </Modal.Open>
          <Link href="/size-chart">
            <button className="text-sm flex items-center cursor-pointer gap-1">
              <BiHelpCircle size={16} className="mt-px" />
              <span className="link--underline">Measurement guide</span>
            </button>
          </Link>
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
                        <td className="p-0.5 font-medium text-left">Weight</td>
                        <td className="text-right p-0.5">
                          {profile.details.body.weight} {profile.details.unit}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center gap-3 mt-4">
                    {/* Edit measurement button */}
                    <Modal.Open opens="edit-measurement">
                      <Button
                        color="white"
                        onClick={() => setMeasurement(profile)}
                      >
                        Edit
                      </Button>
                    </Modal.Open>
                    {/* Delete measurement button */}
                    <Modal.Open opens="delete-measurement">
                      <Button
                        color="white"
                        onClick={() => setMeasurement(profile)}
                      >
                        Delete
                      </Button>
                    </Modal.Open>
                  </div>
                </div>
              ))}
              {/* Pagination controls */}
              {measurements.length > PAGE_SIZE && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  {page > 1 && (
                    <button
                      onClick={() => {
                        const prev = Math.max(1, page - 1);
                        setPage(prev);
                        // Scroll to top of measurements list
                        window.scrollTo({
                          top: 0,
                          behavior: "auto" as ScrollBehavior,
                        });
                      }}
                      className="w-11 h-11 flex items-center justify-center cursor-pointer button"
                      aria-label="Previous page"
                    >
                      <BsChevronLeft size={16} />
                    </button>
                  )}

                  <div className="flex items-center gap-4">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pNum = idx + 1;
                      return (
                        <button
                          key={pNum}
                          onClick={() => {
                            setPage(pNum);
                            // Scroll to top of measurements list
                            window.scrollTo({
                              top: 0,
                              behavior: "auto" as ScrollBehavior,
                            });
                          }}
                          className={twMerge(
                            `w-11 h-11 flex items-center justify-center cursor-pointer hover:[&>span]:border-[#121212]`,
                            pNum === page && "[&>span]:border-[#121212]"
                          )}
                        >
                          <span className="px-2 py-1 text-sm font-medium inline-block border-b border-transparent">
                            {pNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {page < totalPages && (
                    <button
                      onClick={() => {
                        const next = Math.min(totalPages, page + 1);
                        setPage(next);
                        // Scroll to top of measurements list
                        window.scrollTo({
                          top: 0,
                          behavior: "auto" as ScrollBehavior,
                        });
                      }}
                      className="w-11 h-11 flex items-center justify-center cursor-pointer button"
                      aria-label="Next page"
                    >
                      <BsChevronRight size={16} />
                    </button>
                  )}
                </div>
              )}
              {/* Modals */}
            </Container.Row.Column>
          </Container.Row>
        )}
        {/* Add measurement modal */}
        <Steps>
          <AddMeasurementModal />
          {/* Delete measurement modal */}
          <DeleteMeasurementModal
            id={measurement?._id}
            onClose={() => setMeasurement(null)}
          />
          {/* Edit measurement modal */}
          <EditMeasurementModal
            measurement={measurement}
            onClose={() => setMeasurement(null)}
          />
        </Steps>
      </Modal>
    </div>
  );
}

export default page;
