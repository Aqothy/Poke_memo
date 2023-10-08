export default function Card({ loading, points, setAlreadyClicked, pokeData }) {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokeData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center border border-solid border-gray-500 cursor-pointer rounded-xl hover:shadow-lg hover:shadow-blue-400"
              onClick={() => {
                setAlreadyClicked((currentClicked) => {
                  return [...currentClicked, item.id];
                });
                points(item.id);
              }}
            >
              <img src={item.sprites.front_default} />
              <p>{item.name}</p>
            </div>
          );
        })
      )}
    </>
  );
}
