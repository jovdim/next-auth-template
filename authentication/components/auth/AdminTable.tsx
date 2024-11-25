"use client";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { userDataWithUserId } from "@/authentication/lib/types";

export default function AdminTable({
  userData,
}: {
  userData: userDataWithUserId[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const usersPerPage = 7;

  // Filter and sort users
  const filteredUsers = userData
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const compareA = sortOrder === "asc" ? a.name : b.name;
      const compareB = sortOrder === "asc" ? b.name : a.name;
      return compareA.localeCompare(compareB);
    });

  const totalUsers = filteredUsers.length;
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg rounded-lg bg-white p-4 shadow-lg">
      {/* Filter Controls */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[70%] rounded-lg border border-gray-300 p-2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-[25%] rounded-lg border border-gray-300 p-2 text-sm"
        >
          <option value="asc">Sort by Name (A-Z)</option>
          <option value="desc">Sort by Name (Z-A)</option>
        </select>
      </div>
      <p className="text-center font-semibold text-gray-800">A list of users</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Profile</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="text-center font-medium">
                {user.id}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Avatar>
                    <AvatarImage src={user.image} alt="profile icon" />
                    <AvatarFallback className="bg-gray-200">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {user.name}
              </TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="py-2 text-center text-gray-600">
              Total Users: {totalUsers}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-l-lg bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          <MdOutlineKeyboardArrowLeft size={24} />
        </button>
        <span className="px-4 py-2 text-sm text-gray-700">
          Page {currentPage} of {Math.ceil(totalUsers / usersPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalUsers / usersPerPage)}
          className="rounded-r-lg bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          <MdOutlineKeyboardArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
