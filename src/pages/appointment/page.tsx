import { cleanAppointmentData } from "@/lib/botpress";
import { logError } from "@/lib/utils";
import { useBotpressClientStore } from "@/stores";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppointmentTable, { IAppointment } from "./_components/AppointmentTable";

const AppoitmentsPage = () => {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    botpressClient
      ?.findTableRows({
        table: "AppoinmentsTable",
        limit: 10,

        // filter: {
        //   name: {
        //     $regex: "mufil",
        //     $options: "i",
        //   },
        // },

        orderBy: "Appoinment Date",
        orderDirection: "desc",
      })
      .then((res) => {
        console.log(res);
        const cleanedData = cleanAppointmentData(res.rows);
        setAppointments(cleanedData);
      })
      .catch((err) => {
        logError(err);
        toast.error("failed to fetch appointments");
      });
  }, [botpressClient]);
  return (
    <div className="flex w-full h-screen overflow-hidden p-3 gap-2 bg-gray-100">
      {/* <h1 className="w-1/2">Appoitments</h1> */}
      <AppointmentTable data={appointments} />
    </div>
  );
};

export default AppoitmentsPage;
