# Test function 

1. Make onRequest Function

```typescript
exports.sayHello = onRequest(
  { cors: [/firebase\.com$/, "flutter.com"] },
  async (req: any, res: any) => {

  const db: Firestore = getFirestore();
  const docRef = db.doc('stats/group_stats')
  const docSnap = await docRef.get();
  const data: any = docSnap.data();

  // Send Response<any> back to client
  res.status(200).send(data);
  // No need for return 
  }
);
```

2. query the function for testing 

```bash
    curl -i \
     --header "Content-Type: application/json" \
     -X POST \
     -d '{"players": "["Mike", "Wilson"]"}' \
     http://127.0.0.1:5001/test-f3464/us-central1/sayHello     
```

revise UUID generation method
1. python vs js uuid result is not tested 
2. js uuid may not serve the purpose 