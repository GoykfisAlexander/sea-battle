import "./Box.css";
import { pcFlot, playerFlot } from "../../utils";
interface iPropsBox {
  value: number;
  index: number;
  movePc: boolean[];
  movePlayer: boolean[];
  player: boolean;
  openPc: boolean[];
  setOpenPc: (value: boolean[]) => void;
  playerField: number[];
  openPlayer: boolean[];
}
const colorsBoxes = ["aqua", "gold", "green", "olive", "indigo"];

let idPcMove = NaN;

let wounded = 0;

let firstWound = NaN;
export const Box = ({
  value,
  index,
  movePc,
  movePlayer,
  player,
  openPc,
  setOpenPc,
  playerField,
  openPlayer,
}: iPropsBox) => {
  const click = () => {
    openPc[index] = true;
    movePlayer[index] = true;
    setOpenPc([...openPc]);
    const reserved: boolean[] = [];

    const reservedPush = (arr: boolean[], e: number) => {
      arr[e] = true;
      arr[e % 10 === 0 ? NaN : e - 1] = true;
      arr[e % 10 === 9 ? NaN : e + 1] = true;
      arr[e + 10] = true;
      arr[e - 10] = true;
      arr[e % 10 === 0 ? NaN : e - 11] = true;
      arr[e % 10 === 9 ? NaN : e + 11] = true;
      arr[e % 10 === 0 ? NaN : e + 9] = true;
      arr[e % 10 === 9 ? NaN : e - 9] = true;
    };

    if (value) {
      const ship = pcFlot[value].filter((e) => e.includes(index))[0];
      if (ship.every((e) => movePlayer[e])) {
        ship.forEach((e) => reservedPush(reserved, e));
        reserved.forEach((e, i) => e && (openPc[i] = true));
        setOpenPc([...openPc]);
        if (
          Object.values(pcFlot)
            .join()
            .split(",")
            .map(Number)
            .every((e) => movePlayer[e])
        ) {
          setOpenPc([...Array(100).fill(true)]);
          alert("победил игрок");
        }
      }
      return;
    }
    const pcMoved = () => {
      const nextMove = (id: number) => {
        const nextMoves = [id + 1, id - 1, id + 10, id - 10];
        let z = Math.floor(Math.random() * 4);
        let x = Math.random() < 0.5 ? 0 : 1;
        let y = Math.random() < 0.5 ? 2 : 3;
        let nextMov =
          wounded < 2 ? z : firstWound % 10 === idPcMove % 10 ? y : x;
        let res = nextMoves[nextMov];
        let dontGetHungUp = 0;

        while (
          [
            res < 0,
            res > 99,
            openPlayer[res],
            (id - 1 === res || id + 1 === res) &&
              Math.floor(res / 10) !== Math.floor(id / 10),
          ].some((e) => e)
        ) {
          dontGetHungUp++;
          z = Math.floor(Math.random() * 4);
          x = Math.random() < 0.5 ? 0 : 1;
          y = Math.random() < 0.5 ? 2 : 3;
          nextMov = wounded < 2 ? z : firstWound % 10 === idPcMove % 10 ? y : x;
          res = nextMoves[nextMov];
          if (dontGetHungUp === 50) {
            nextMove(firstWound);
            break;
          }
        }

        return res;
      };
      const attacksRandom = () => {
        if (!wounded) {
          let random = Math.floor(Math.random() * 100);
          while (openPlayer[random]) {
            random = Math.floor(Math.random() * 100);
          }

          attacks(random);
        }
      };
      const attacks = (id: number) => {
        movePc[id] = true;
        openPlayer[id] = true;
        if (!playerField[id]) {
          return;
        }
        wounded++;
        if (wounded === 1) {
          firstWound = id;
        }
        idPcMove = id;

        const ship = playerFlot[playerField[id]].filter((e) =>
          e.includes(id)
        )[0];
        if (ship.every((e) => movePc[e])) {
          ship.forEach((e) => reservedPush(openPlayer, e));
          wounded = 0;
          if (
            Object.values(playerFlot)
              .join()
              .split(",")
              .map(Number)
              .every((e) => movePc[e])
          ) {
            setOpenPc([...Array(100).fill(true)]);
            alert("победил PC");
            return;
          }
          attacksRandom();

          return;
        }
        attacks(nextMove(idPcMove));
      };
      if (wounded) {
        attacks(nextMove(firstWound));
      } else {
        attacksRandom();
      }
    };
    pcMoved();
  };
  return (
    <div
      onClick={() => {
        if (!player && !openPc[index]) {
          click();
        }
      }}
      className="box"
      style={
        player || openPc[index]
          ? {
              background: `radial-gradient(${
                (player && movePc[index]) || (!player && movePlayer[index])
                  ? "red"
                  : colorsBoxes[value]
              },${colorsBoxes[value]} 50%)`,
            }
          : {}
      }
    ></div>
  );
};
