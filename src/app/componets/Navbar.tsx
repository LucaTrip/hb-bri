"use client";

import { Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Choice } from "../utils/interface";

const actions = [
  {
    label: "Location",
    link: "https://www.google.com/maps/dir/43.0744884,12.3240286/villa+egle/@43.118185,12.2459881,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x132c1d501ed97403:0x51c23a5dd5a9ba13!2m2!1d12.334689!2d43.1615467?entry=ttu",
  },
  {
    label: "Non conosci il tuo segno?",
    link: "https://it.astro-seek.com/tema-natale-calcolo-oroscopo-online",
  },
  { label: "Info partecipanti" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [allParticipant, setAllParticipant] = useState<Choice[]>([]);

  useEffect(() => {
    if (openModal) {
      toast
        .promise(fetch("/api/choice"), {
          loading: "Caricando...",
          success: "Partecipanti recuperati",
          error: "Errore. Contatta la bri 😅",
        })
        .then(async (res) => {
          const allParticipant: Choice[] = await res.json();
          console.log("dasdsad", allParticipant);
          setAllParticipant(allParticipant || []);
        })
        .catch((error) => {
          console.log("get participant error", error);
        });
    }
  }, [openModal]);

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-full">
          <div className="flex items-center justify-between pb-4">
            <p>Tot. partecipanti</p>
            <p>{allParticipant.length}</p>
          </div>

          {allParticipant.length ? (
            <table className="w-full border border-black border-solid">
              <tbody>
                <tr>
                  <td className="border border-black border-solid">Nome</td>
                  <td className="border border-black border-solid text-center">
                    Viene?
                  </td>
                </tr>
                {allParticipant.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-black border-solid">
                      {item.name}
                    </td>
                    <td className="border border-black border-solid text-center">
                      {item.coming ? "Si" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </Modal>

      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-hidden" : "",
            "bg-white shadow-sm overflow-hidden"
          )
        }
      >
        {({ open, close }) => (
          <>
            <div className="mx-auto max-w-7xl fixed inset-x-0 z-40 backdrop-blur-sm bg-black/60">
              <div className="relative mx-auto max-w-xl flex justify-end">
                {/* Mobile menu button */}
                <Popover.Button className="rounded-md p-2 outline-none">
                  {open ? (
                    <XMarkIcon className="block h-10 w-10" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-10 w-10" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>

            <Popover.Panel
              as="nav"
              className="fixed inset-x-0 pt-14 z-30 mx-auto max-w-7xl"
              aria-label="Global"
            >
              <div className="mx-auto max-w-xl text-gray-900">
                {actions.map((item) =>
                  item.link ? (
                    <a
                      target="_blank"
                      key={item.label}
                      href={item.link}
                      className="py-2 px-3 text-[17.8px] font-medium block"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.label}
                      className="py-2 px-3 text-[17.8px] font-medium w-full text-left"
                      onClick={() => {
                        close();
                        setOpenModal(true);
                      }}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}
