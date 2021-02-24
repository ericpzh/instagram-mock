import avatar1 from "../avatars/avatar1.png";
import avatar2 from "../avatars/avatar2.png";
import avatar3 from "../avatars/avatar3.png";
import avatar4 from "../avatars/avatar4.png";
import avatar5 from "../avatars/avatar5.png";
import avatar6 from "../avatars/avatar6.png";

const avatars = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6
]

export function avatarGenerator(){//generate a random number as avatar index
  const avatarNum = Math.floor(Math.random() * 6);
  return avatarNum;
}

export function avatarGetter(avatarNum){// get avatar accroding to index
  return avatars[avatarNum];
}
