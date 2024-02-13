const mapd = new window.google.maps.Map(document.getElementById("map"), {
  center: { lat: -0.0397, lng: 37.644 },
  zoom: 8,
});

const url = "http://127.0.0.1:8000/projects/";
let features = [];

const getData = async () => {
  try {
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("something went wrong", response);
    }
    console.log("response", response);

    const data = await response.json();
    features = data.results.features;
    console.log("Government Projects", features);

    // set markers
    setMarkers(features);
  } catch (error) {
    console.log("error", error);
  }
};
// info window
const infoWindow = new window.google.maps.InfoWindow({
  content: "",
  disableAutoPan: true,
});

const setMarkers = (locations) => {
  locations.map((location, index) => {
    let project_type = location.properties.project_type;
    let url;
    switch (project_type) {
      case "Urbanization":
        url = "./markers/school.png";
        break;
      case "Transport":
        url = "./markers/hospital.png";
        break;
      default:
        url = "./markers/park.png";
    }
    const latlng = new window.google.maps.LatLng({
      lat: location.geometry.coordinates[1],
      lng: location.geometry.coordinates[0],
    });
    const marker = new window.google.maps.Marker({
      position: latlng,
      map: mapd,
      icon: url,
      label: index + 1 + "",
      size: "20px",
    });

    marker.addListener("click", () => {
      infoWindow.setContent(
        `<h3>${location.properties.title}</h3>\n` +
          `<p>${location.properties.about}</p>`
      );
      infoWindow.open({
        map: mapd,
        anchor: marker,
      });
    });
    return marker;
  });
};
// getData();
