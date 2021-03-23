### List GitHub trending repositories

```http
GET /api/trending
```

#### Parameters

| Name                   | Type   | In    | Description                                |
| ---------------------- | ------ | ----- | ------------------------------------------ |
| `language`             | string | path  | Programming language                       |
| `since`                | string | query | Can be one of `daily`, `weekly`, `monthly` |
| `spoken_language_code` | string | query | Spoken language                            |

#### Code samples

```shell
curl \
  https://honyex.vercel.app/api/trending
```

#### Default response

```
Status: 200 OK
```

```json
[
  {
    "owner": {
      "login": "LukeSmithxyz",
      "avatar_url": "https://github.com/LukeSmithxyz.png"
    },
    "name": "based.cooking",
    "description": "A simple culinary website.",
    "language": "Makefile",
    "stargazers_count": "956"
  }
]
```
