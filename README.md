# Simple DynamoDB

A simple wrapper to help you work with DynamoDB. Used to live as copy pasta in all my projects, decided to make it open source so I can keep making it better.

Here is a full tutorial building an example CRUD API with Simple DynamoDB 👉 [Serverless Handbook: REST API](https://serverlesshandbook.dev/serverless-rest-api#build-a-simple-rest)

## Installation

```
yarn add simple-dynamodb
```

Import as:

```typescript
import * as db from "simple-dynamodb";
```

for best ease of use. The rest of this README assumes you're importing like this :)

## Methods

These are thin wrappers on native AWS SDK DynamoDB functions. Promisified for easier use and with sensible defaults for code readability.

### getItem

`getItem` reads specific items from your database.

```typescript
const item = await db.getItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId }
});

console.log(item.Item);
```

### updateItem

`updateItem` upserts items into your database and returns the entire object by default.

```typescript
const item = await db.updateItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId },
    UpdateExpression: `SET ${db.buildExpression(body)}`,
    ExpressionAttributeValues: {
        ...db.buildAttributes(body)
    }
    // default ReturnValues: "ALL_NEW"
});

console.log(item.Attributes);
```

### buildExpression

Helper method to turn a `{ key: value }` object into a DynamoDB expression.

Use it in your `SET` or other expressions as a string fragment. Add your own custom values on top.

```typescript
UpdateExpression: `SET ${db.buildExpression(body)}`,
```

### buildAttributes

Helper method to turn a `{ key: value }` object into a DynamoDB attributes list.

Use it for your `ExpressionAttributeValues` and add your own custom values on top.

```typescript
ExpressionAttributeValues: {
    ...db.buildAttributes(body)
}
```

### deleteItem

Deletes an item from your database and returns its old values by default.

```typescript
const item = await db.deleteItem({
    TableName: process.env.ITEM_TABLE!,
    Key: { itemId }
    // default ReturnValues: "ALL_OLD"
});

console.log(item.Attributes);
```

### scanItems

Used for searching through your database table.

```typescript
// to get all values from a table
const result = await db.scanItems({
    TableName: process.env.ITEM_TABLE!
});

console.log(result.Items);
```

To filter based on params, you can do something like this:

```typescript
const searchBy = {
    userId
}

const result = await db.scanItems({
    TableName: process.env.ITEM_TABLE!,
    FilterExpression: `#user = :userId`,
    ExpressionAttributeNames: {
        "#user": "userId"
    },
    ExpressionAttributeValues: {
        ...db.buildAttributes(searchBy)
    }
}

console.log(result.Items)
```

## Author

👤 **Swizec Teller <swizec@swizec.com>**

-   Github: [@swizec](https://github.com/swizec)
-   Twitter: [@swizec](https://twitter.com/swizec)
-   Blog: [swizec.com/blog](https://swizec.com/blog)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Swizec/useAuth/issues).

I am looking to support other authentication providers. Please help :)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Swizec Teller <swizec@swizec.com>](https://github.com/swizec).<br />
This project is [MIT](https://github.com/Swizec/useAuth/blob/master/LICENSE) licensed.
