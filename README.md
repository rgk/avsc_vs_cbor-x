# avsc_vs_cbor-x
Avsc vs cbor-x benchmarks.

round1-simple / avsc schema: 88.238ms

round1-simple / avsc infer: 80.073ms

round1-simple / cbor-x encode/decode: 159.095ms

round1-simple / cbor-x encoder/decoder: 122.096ms

round2-simple / avsc schema: 86.401ms

round2-simple / avsc infer: 59.204ms

round2-simple / cbor-x encode/decode: 120.826ms

round2-simple / cbor-x encoder/decoder: 83.363ms

round1 / avsc schema: 152.625ms

****** Serialization error with avsc infer

round1 / avsc infer: 164.288ms

round1 / cbor-x encode/decode: 351.962ms

round1 / cbor-x encoder/decoder: 201.999ms

round2 / avsc schema: 124.379ms

****** Serialization error with avsc infer

round2 / avsc infer: 130.937ms

round2 / cbor-x encode/decode: 323.056ms

round2 / cbor-x encoder/decoder: 148.983ms

* Warning, this is not a good benchmark at all, this is just a test, with a very small data set.
