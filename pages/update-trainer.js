import UpdateTrainer from "../components/updateTrainer";

const UpdateTrainerPage = ({ query }) => (
  <div>
    <UpdateTrainer id={query.id} />
  </div>
);

export default UpdateTrainerPage;
