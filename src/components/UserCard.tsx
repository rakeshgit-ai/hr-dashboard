import React from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
};

type Props = {
  user: User;
  onView: () => void;
  onBookmark: () => void;
  onPromote: () => void;
  isBookmarked: boolean;
};

const UserCard: React.FC<Props> = ({
  user,
  onView,
  onBookmark,
  onPromote,
  isBookmarked,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="font-bold text-lg">{user.firstName} {user.lastName}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm">Age: {user.age}</p>
        <p className="text-sm">Dept: {user.department}</p>
      </div>
      <div>
        {/* Rating as stars */}
        <div className="flex">
          {[1,2,3,4,5].map((star) => (
            <span key={star} className={star <= user.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex gap-2 mt-2">
      <button className="btn btn-primary" onClick={onView}>View</button>
      <button className={`btn ${isBookmarked ? "btn-secondary" : "btn-outline"}`} onClick={onBookmark}>
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
      <button className="btn btn-success" onClick={onPromote}>Promote</button>
    </div>
  </div>
);

export default UserCard;