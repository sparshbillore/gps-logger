const db = require("../config/db");
const asyncHandler = require("express-async-handler");


const gpsSummary = asyncHandler(async (req, res) => {
  const searchTerm = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.limit) || 5;

  const sortBy = req.query.sortBy || "device_id";
  const sortOrder = req.query.orderBy === "desc" ? -1 : 1;

  const result = await db.query("SELECT * FROM gps");

  const keys = ["device_id", "device_type"];

  let items = result.rows;

  if (searchTerm) {
    items = items.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchTerm))
    );
  }

  items = items.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
    if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
    return 0;
  });

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = items.slice(startIndex, Math.min(endIndex, items.length));

  const totalPages = Math.ceil(items.length / perPage);
  res.send({
    paginatedData,
    page,
    totalPages,
    totalCount: items.length,
  });
});



// const gpsSummary = asyncHandler(async (req, res) => {
//   const searchTerm = req.query.q;
//   const page = parseInt(req.query.page) || 1;
//   const perPage = req.query.limit || 5;

//   const sortBy = req.query.sortBy || "device_id";
//   const sortOrder = req.query.orderBy === "desc" ? -1 : 1;

//   const result = await db.query("SELECT * FROM gps");

//   const keys = ["device_id", "device_type"];

//   let items = result.rows;

//   if (searchTerm) {
//     items = items.filter((item) =>
//       keys.some((key) => item[key].toLowerCase().includes(searchTerm))
//     );
//   }

//   items = items.sort((a, b) => {
//     if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
//     if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
//     return 0;
//   });

//   const startIndex = (page - 1) * perPage;
//   const endIndex = startIndex + perPage;
//   const paginatedData = items.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(items.length / perPage);
//   res.send({
//     paginatedData,
//     page,
//     totalPages,
//     totalcount: items.length,
//   });
// });

const deviceDetails = asyncHandler(async (req, res) => {
  deviceId = req.params.deviceId;
  const deviceTimestampLocation = await db.query(
    `SELECT timestamp, location FROM gps WHERE device_id = '${deviceId}'`
  );

  const deviceType = await db.query(
    "SELECT device_type FROM gps WHERE device_id = $1 group by device_type",
    [deviceId]
  );

  const totalVisits = deviceTimestampLocation.rows.length;

  const visitsPerLocation = await db.query(
    "SELECT location, count(location) FROM public.gps WHERE device_id = $1 GROUP BY device_id, location",
    [deviceId]
  );

  const percentagePerLocation = visitsPerLocation.rows.map((item) => {
    const percentCount = (item.count / totalVisits) * 100;
    return {
      location: item.location,
      percentage: percentCount,
    };
  });

  res.status(200).json({
    device_Id: deviceId,
    deviceType: deviceType.rows[0].device_type,
    deviceTimestampLocation: deviceTimestampLocation.rows,
    percentagePerLocation: percentagePerLocation,
    // visitsPerLocation : visitsPerLocation.rows
  });
});

module.exports = {
  gpsSummary,
  deviceDetails,
};
