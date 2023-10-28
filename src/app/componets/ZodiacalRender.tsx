"use client";

import { useEffect, useState } from "react";
import ZodiacalButton from "./ZodiacalButton";
import Image from "next/image";

import Aquarius from "../assets/aquarius.jpg";
import Aries from "../assets/aries.jpg";
import Cancer from "../assets/cancer.jpg";
import Capricorn from "../assets/capricorn.jpg";
import Gemini from "../assets/gemini.jpg";
import Leo from "../assets/leo.jpg";
import Libra from "../assets/libra.jpg";
import Pisces from "../assets/pisces.jpg";
import Sagittarius from "../assets/sagittarius.jpeg";
import Scorpio from "../assets/scorpio.jpg";
import Taurus from "../assets/taurus.jpg";
import Virgo from "../assets/virgo.jpg";
import toast from "react-hot-toast";

import BAquarius from "../assets/b-aquarius.png";
import BAries from "../assets/b-aries.png";
import BCancer from "../assets/b-cancer.png";
import BCapricorn from "../assets/b-capricorn.png";
import BGemini from "../assets/b-gemini.png";
import BLeo from "../assets/b-leo.png";
import BLibra from "../assets/b-libra.png";
import BPisces from "../assets/b-pisces.png";
import BSagittarius from "../assets/b-sagittarius.png";
import BScorpio from "../assets/b-scorpio.png";
import BTaurus from "../assets/b-taurus.png";
import BVirgo from "../assets/b-virgo.png";

const zodiacalSigns = [
  { id: "aries", img: BAries },
  { id: "taurus", img: BTaurus },
  { id: "gemini", img: BGemini },
  { id: "cancer", img: BCancer },
  { id: "leo", img: BLeo },
  { id: "virgo", img: BVirgo },
  { id: "libra", img: BLibra },
  { id: "scorpio", img: BScorpio },
  { id: "sagittarius", img: BSagittarius },
  { id: "capricorn", img: BCapricorn },
  { id: "aquarius", img: BAquarius },
  { id: "pisces", img: BPisces },
];

export default function ZodiacalRender() {
  const [zodiacalSign, setZodiacalSign] = useState<string>();
  const [inputName, setInputName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("choice_sended");
    if (val && Boolean(val)) setSuccess(true);
  }, []);

  function getZodiacalImage() {
    switch (zodiacalSign) {
      case "aries":
        return Aries;

      case "taurus":
        return Taurus;

      case "gemini":
        return Gemini;

      case "cancer":
        return Cancer;

      case "leo":
        return Leo;

      case "virgo":
        return Virgo;

      case "libra":
        return Libra;

      case "scorpio":
        return Scorpio;

      case "sagittarius":
        return Sagittarius;

      case "capricorn":
        return Capricorn;

      case "aquarius":
        return Aquarius;

      case "pisces":
        return Pisces;

      default:
        return Aries;
    }
  }

  async function onUpdateInfo(areComing: boolean) {
    if (inputName) {
      setLoading(true);

      try {
        await toast.promise(
          fetch("/api/choice", {
            method: "POST",
            body: JSON.stringify({
              name: inputName,
              coming: areComing,
            }),
          }),
          {
            loading: "Inviando la conferma...",
            success: "Conferma inviata con successo 🎉",
            error: "Errore. Contatta la bri 😅",
          }
        );
        localStorage.setItem("choice_sended", "true");
        setSuccess(true);
      } catch (error) {
        console.log("update db error", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="px-3 py-5 flex flex-col gap-y-5 text-[#CDA742] text-[17.8px]">
      <p>
        Seleziona il tuo segno zodiacale per scoprire il tuo outfit! Poi
        conferma la tua presenza
      </p>

      {zodiacalSign ? (
        <>
          <Image alt="" src={getZodiacalImage()} />

          <div>
            {success ? (
              <div className="text-center py-5">
                <p>Hai inviato la tua partecipazione!</p>
              </div>
            ) : (
              <>
                <p className="py-5">
                  Ora che sai come vestirti, fammi sapere se vieni:
                </p>

                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      htmlFor="participant"
                      className="block text-sm font-medium leading-6"
                    >
                      Nome
                    </label>
                    <div className="mt-2">
                      <input
                        disabled={loading}
                        type="participant"
                        name="participant"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Ambra Graziani"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-around gap-3">
                    <div className="flex-1">
                      <ZodiacalButton
                        disabled={loading}
                        label="Si, vengo"
                        onClick={() => onUpdateInfo(true)}
                      />
                    </div>
                    <div className="flex-1">
                      <ZodiacalButton
                        disabled={loading}
                        label="No"
                        onClick={() => onUpdateInfo(false)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {zodiacalSigns.map((item, index) => (
            <ZodiacalButton
              key={item.id}
              image={item.img}
              className="border-none"
              onClick={(e) => {
                setZodiacalSign(zodiacalSigns[index].id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
