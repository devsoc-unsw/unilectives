import { authOptions } from "@/lib/auth";
import { AlertContext } from "@/lib/snackbar-context";
import { post } from "@/utils/request";
import { Dialog, Transition } from "@headlessui/react";
import { FlagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export default function ReportModal({ reviewId }: { reviewId: string }) {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    isOther: false,
    reason: "",
  });
  const [otherReason, setOtherReason] = useState("");
  const { data: session, status } = useSession();
  const { setAlert } = useContext(AlertContext);

  // function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Handle when radio input is changed
  const handleRadioOnChange = useCallback((event: ChangeEvent) => {
    setInput((prevInput: typeof input) => {
      const newInput = { ...prevInput };
      const target = event.target as HTMLInputElement;
      if (target.id === "report-other") {
        newInput.isOther = true;
      } else {
        newInput.isOther = false;
      }
      newInput.reason = target.value;
      return newInput;
    });
  }, []);

  // Update reason when other reason is updated
  useEffect(() => {
    setInput((prevInput: typeof input) => {
      const newInput = { ...prevInput };
      newInput.reason = otherReason;
      return newInput;
    });
  }, [otherReason]);

  // handle on submit
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    closeModal();

    const body = {
      reviewId,
      zid: session?.user?.id,
      reason: input.reason,
    };

    const res = await post("/reports", body);

    if (res.errorCode) {
      setAlert(
        res.errorCode === 400
          ? "You have already reported this review."
          : "Try again later",
      );
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="isolate flex">
        {/* Report button */}
        <button
          onClick={openModal}
          className="hover:text-unilectives-blue focus:text-unilectives-blue cursor-pointer"
        >
          <FlagIcon className="w-5 h-5" />
        </button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Dark background behind modal */}
              <div className="ml-[80px] fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="ml-[80px] fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md text-left align-middle shadow-xl transition-all bg-unilectives-modal px-8 py-6 space-y-4 isolate">
                    {/* Modal title + close button */}
                    <div className="flex justify-between items-center">
                      <Dialog.Title as="h1" className="text-2xl font-bold">
                        Reason for Report
                      </Dialog.Title>
                      <button onClick={closeModal}>
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <hr className="border-black/25" />
                    <h2 className="text-lg font-bold">
                      Why are you reporting this?
                      <span className="text-red-500"> *</span>
                    </h2>
                    {/* Report form */}
                    <form
                      name="submit-report"
                      className="space-y-2"
                      onSubmit={handleOnSubmit}
                    >
                      {/* Hate speech */}
                      <div className="space-x-1">
                        <input
                          name="reason"
                          type="radio"
                          id="report-hate-speech"
                          value="Hate speech"
                          onChange={handleRadioOnChange}
                        />
                        <label htmlFor="report-hate-speech">Hate speech</label>
                      </div>
                      {/* Spam */}
                      <div className="space-x-1">
                        <input
                          name="reason"
                          type="radio"
                          id="report-spam"
                          value="Spam"
                          onChange={handleRadioOnChange}
                        />
                        <label htmlFor="report-spam">Spam</label>
                      </div>
                      {/* Other */}
                      <div className="space-x-1">
                        <input
                          name="reason"
                          type="radio"
                          id="report-other"
                          value={otherReason}
                          onChange={handleRadioOnChange}
                        />
                        <label htmlFor="report-other">Other</label>
                      </div>
                      <input
                        name="other-reason"
                        type="text"
                        placeholder="Please enter other reason here."
                        disabled={!input.isOther}
                        onChange={(event) => setOtherReason(event.target.value)}
                        className="py-2 px-4 w-full border border-unilectives-headings/25 rounded-md outline-none focus:shadow-input"
                      />
                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={input.reason === ""}
                        className="ml-auto flex items-center gap-1 px-4 py-2 bg-unilectives-icon text-white rounded-md hover:bg-unilectives-icon/95 font-bold disabled:opacity-50"
                      >
                        Submit
                      </button>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
