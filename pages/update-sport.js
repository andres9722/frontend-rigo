import UpdateSport from "../components/updateSport";

const UpdateSportPage = ({ query }) => (
  <div>
    <UpdateSport id={query.id} />
  </div>
);

export default UpdateSportPage;
