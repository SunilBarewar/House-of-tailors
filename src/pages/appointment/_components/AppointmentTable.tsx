import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export type IAppointment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  location: string | null;
  phoneNumber: string | null;
  appointmentDate: string | null;
};

interface AppointmentTableProps {
  handleSort: (field: string) => void;
  sortOrder: "asc" | "desc";
  sortField: string | null;
  appointments: IAppointment[];
  loading: boolean;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  handleSort,
  sortField,
  sortOrder = "asc",
  appointments = [],
  loading = false,
}) => {
  return (
    <div className="w-full flex-grow overflow-auto h-[80%]">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location </TableHead>
              <TableHead>Phone Number </TableHead>
              <TableHead
                onClick={() => handleSort("appointmentDate")}
                className="cursor-pointer"
              >
                Appointment Time{" "}
                {sortField === "appointmentDate" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading appointments ...
                </TableCell>
              </TableRow>
            ) : appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.location ?? "N/A"}</TableCell>
                  <TableCell>{appointment.phoneNumber ?? "N/A"}</TableCell>
                  <TableCell>{appointment.appointmentDate ?? "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentTable;
