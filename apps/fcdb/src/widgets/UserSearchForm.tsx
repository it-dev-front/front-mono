export const UserSearchForm = () => {
  return (
    <form action="/user" method="GET">
      <input
        name="name"
        type="text"
        placeholder="구단주 이름을 입력해주세요."
        className="w-[500px] h-14 bg-white text-[#000000] px-4 py-2 rounded-lg"
      />
      <button
        type="submit"
        className="ml-4 w-32 h-[60px] bg-gray-900 text-[#FFFFFF] px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        전적보기
      </button>
    </form>
  );
};
