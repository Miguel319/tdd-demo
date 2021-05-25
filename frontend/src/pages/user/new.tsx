import { FC, useEffect } from "react";
import NewCompany from "../../components/Company/NewCompany";
import RootState from "../../interfaces/state/root.state";
import { IUser } from "../../interfaces/models/IUser";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const NewUser: FC = () => {
  const history = useHistory();

  const currentUser: IUser | null = useSelector(
    (root: RootState) => root.auth.currentUser
  );

  useEffect(() => {
    const isUserRegistered: boolean = Boolean(currentUser?.associatedEntity);

    if (!currentUser || isUserRegistered) history.push("/");
  }, []);

  return currentUser && currentUser?.role === "Company" ? (
    <NewCompany user={currentUser} />
  ) : null;
};

export default NewUser;
