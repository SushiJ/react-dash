# React dashboard

### quickstart

```sh
cd server
docker compose up

# Seeding mongo
pnpm seed

# Running the dev server
pnpm dev ./server && pnpm dev ./web
# open localhost:5173
```

### stack

- React
- MUI
- Express
- Mongo
- typegoose
- Redux toolkit query

### overview

-- Dashboard
<img src="ss/dashboard.png" />

-- Products
<img src="ss/Products.png" />

-- Geolocation of customers
<img src="ss/map.png" />

-- Sales
<img src="ss/sales.png" />

-- Breakdown
<img src="ss/breakdown-wheel.png" />

### routes

#### Client-facing: shows stat for the currently logged-in user

prefix with : /client

| method | route         | description                          |
| ------ | ------------- | ------------------------------------ |
| GET    | /products     | get list of products and reviews     |
| GET    | /customers    | get list of customers                |
| GET    | /transactions | get list of transactions             |
| GET    | /geography    | get customer details, geographically |

#### management

prefix with : /management

| method | route            | description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | /admins          | get list of admins                   |
| GET    | /performance/:id | get performance details for given id |

#### misc

| method | route             | description                        |
| ------ | ----------------- | ---------------------------------- |
| GET    | /general/user/:id | User info for the given id         |
| GET    | /dashboard        | Dashboard for the logged-in user   |
| GET    | /sales            | sales details for the current user |

### Learnings:

- MUI has some pretty useful predefined components

- Aggregating data in mongodb is pretty wild:

  - [1](https://github.com/SushiJ/react-dash/blob/main/server/src/controllers/management.controller.ts#L20C1-L59C8)

  ```ts
  export async function getAffiliate(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const transactions = await userModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "affiliates",
          localField: "_id",
          foreignField: "userId",
          as: "sales",
        },
      },
      {
        $unwind: "$sales",
      },
      {
        $project: {
          _id: 0,
          affiliateSales: "$sales.affiliateSales",
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "affiliateSales",
          foreignField: "_id",
          as: "transactions",given id
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const flattenedTransactions = transactions[0].transactions;

    res.status(200).json(flattenedTransactions);
  ```

  - [2](https://github.com/SushiJ/react-dash/blob/main/server/src/controllers/client.controller.ts#L90C1-L134C2)

  ```ts
  export async function getTransactions(req: Request, res: Response) {
  const { page = 1, pageSize = 20, sort = {}, search = "" } = req.query;
  try {
    const formattedSort = generateSort(sort);

    // WARN:This is insane IKR
    const searchQuery = search
      ? {
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$cost" },
                regex: search,
                options: "i",
              },
            },
          },
        ],
        userId: { $regex: new RegExp(String(search), "i") },
      }
      : {};

    const transactions = await transactionsModel
      .find(searchQuery)
      .sort(formattedSort ? formattedSort : {})
      .skip(+page * +pageSize)
      .limit(+pageSize);

    if (!transactions) {
      res.status(404).json({ message: "not found" });
      return;
    }

    // TODO: Instead of doing a query let's do it in the front end
    // since it's not gonna change (stale data)

    // const totalCount = await transactionsModel.count(); INFO: total = 500

    res.status(200).json(transactions);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e.message });
  };
  ```

That's pretty much it, happy hacking!

### TODO:

- Fix some styling issues between light mode and dark mode
