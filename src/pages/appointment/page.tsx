import { ENV_KEYS } from "@/constants/env-keys";
import { cleanAppointmentData } from "@/lib/botpress";
import { getEnvValue, logError } from "@/lib/utils";
import { useBotpressClientStore } from "@/stores";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppointmentTable, { IAppointment } from "./_components/AppointmentTable";
import Pagination from "./_components/Pagination";

const AppointmentsPage = () => {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(25); // Items per page
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const response = await botpressClient?.findTableRows({
        table: getEnvValue(ENV_KEYS.APPOINTMENT_TABLE_ID),
        limit: pageSize,
        offset,

        // filter: {
        //   name: {
        //     $regex: "mufil",
        //     $options: "i",
        //   },
        // },

        orderBy: "Appoinment Date",
        orderDirection: "desc",
      });

      if (!response) return;

      const cleanedData = cleanAppointmentData(response.rows);
      setAppointments(cleanedData);
      setHasMore(response.hasMore);
    } catch (error) {
      logError(error);
      toast.error("failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [botpressClient, offset, sortField, sortOrder]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden p-3 pt-0 gap-2 ">
      <h1 className="w-1/2 my-2">Scheduled Appoitments</h1>
      <AppointmentTable
        appointments={appointments}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortField={sortField}
        loading={loading}
      />

      <Pagination
        hasMore={hasMore}
        setOffset={setOffset}
        pageSize={pageSize}
        offset={offset}
      />
    </div>
  );
};

export default AppointmentsPage;
