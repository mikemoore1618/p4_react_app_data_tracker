Step 1:

```js
const metricSchema = new mongoose.Schema({
  fields: {
    sleep: Number,
  	stress: Number,
  	mood: Number
  },
  notes: String
  createdAt...
  etc
})
```

Step 2:

```js
const metricSchema = new mongoose.Schema({
  fields: { type: mongoose.Schema.Types.Mixed }
})
```

Step 3:

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  ///
  fields: Array
  ///
})
```

When creating a new account, display text fields where they *name* the fields to store (in addition to the standard name, email, password.

When they submit the form, the data should be shaped like:

```js
// the data being sent in the post request should look like:
{
  name: "Philippe",
  email: "philippe@ga.co",
 	password: "password123",
  fields: ["mood", "caffeine", "coding"]
}
```



Step 4.

When creating a new metric, render a form that uses the current user's fields array to name and render the inputs for their metric. And when posting, the data being sent up should look something like:

```js
// req.body might look like:
{
  fields: {
    {mood: 5, notes: ""},
  	caffeine: 4,
  	coding: 10
  },
  // createdAt: ...
}
```

```js
Metric.create({ ...req.body, _by: req.user,  })
```
