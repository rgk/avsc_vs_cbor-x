import Avro from '@avro/types';
import { encode, decode, Encoder, Decoder, isNativeAccelerationEnabled } from 'cbor-x';
import { Buffer } from 'buffer';

if (!isNativeAccelerationEnabled)
  console.warn('cbor-x native acceleration not enabled, verify that install finished properly');

// Config //
const TIMES_TO_RUN = 100000;

function testLoops(label, data, schema, schemaInfer, encoder, decoder) {
  console.time(label + ' / json base');

  let serialized;
  let deserialized;

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = JSON.stringify(data);
    deserialized = JSON.parse(data);
  }

  console.timeEnd(label + ' / json base');

  const dataStr = JSON.stringify(data);

  // avsc

  serialized = schema.toBuffer(data);
  deserialized = schema.fromBuffer(serialized);

  if (dataStr !== JSON.stringify(deserialized))
    console.log('****** Serialization error with avsc schema');

  console.time(label + ' / avsc schema');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schema.toBuffer(data);
    deserialized = schema.fromBuffer(serialized);
  }

  console.timeEnd(label + ' / avsc schema');

  // avsc infer

  serialized = schemaInfer.toBuffer(data);
  deserialized = schemaInfer.fromBuffer(serialized);

  if (dataStr !== JSON.stringify(deserialized))
    console.log('****** Serialization error with avsc infer');

  console.time(label + ' / avsc infer');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaInfer.toBuffer(data);
    deserialized = schemaInfer.fromBuffer(serialized);
  }

  console.timeEnd(label + ' / avsc infer');

  // cbor-x encode/decode

  serialized = encode(data);
  deserialized = decode(serialized);

  if (dataStr !== JSON.stringify(deserialized))
    console.log('****** Serialization error with cbor-x encode/decode');

  console.time(label + ' / cbor-x encode/decode');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encode(data);
    deserialized = decode(serialized);
  }

  console.timeEnd(label + ' / cbor-x encode/decode');

  // cbor-x encoder/decoder

  serialized = encoder.encode(data);
  deserialized = decoder.decode(serialized);

  if (dataStr !== JSON.stringify(deserialized))
    console.log('****** Serialization error with cbor-x encoder/decoder');

  console.time(label + ' / cbor-x encoder/decoder');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encoder.encode(data);
    deserialized = decoder.decode(serialized);
  }

  console.timeEnd(label + ' / cbor-x encoder/decoder');
}

let encoderSimple = new Encoder({
  structures: [["key", "value", "value2"]]
});
let decoderSimple = new Decoder({
  structures: [["key", "value", "value2"]]
});

let encoder = new Encoder({
  structures: [
    ["key", "name", "bool", "littleInt", "bigInt", "decimal", "bigDecimal", "negativeInt", "nullValue", "stringer"]
  ]
});
let decoder = new Decoder({
  structures: [
    ["key", "name", "bool", "littleInt", "bigInt", "decimal", "bigDecimal", "negativeInt", "nullValue", "stringer"]
  ]
});

const schemaSimple = Avro.Type.forSchema({
  name: 'data',
  type: 'record',
  fields: [
    { name: 'key', type: 'int' },
    { name: 'value', type: 'string' },
    { name: 'value2', type: 'int' },
  ]
});

const schema = Avro.Type.forSchema({
  name: 'data',
  type: 'record',
  fields: [
    { name: 'key', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'bool', type: 'boolean' },
    { name: 'littleInt', type: 'int' },
    { name: 'bigInt', type: 'long' },
    { name: 'decimal', type: 'double' },
    { name: 'bigDecimal', type: 'double' },
    { name: 'negativeInt', type: 'int' },
    { name: 'nullValue', type: 'null' },
    { name: 'stringer', type: 'string' }
  ]
});

const dataSimple = {
  key: 1,
  value: "benchmark",
  value2: 12
};

const data = {
  "key": "test",
  "name": "Hello, World!",
  "bool": true,
  "littleInt": 3,
  "bigInt": 32254435,
  "decimal":1.332232,
  "bigDecimal": 3.5522E35,
  "negativeInt": -54,
  "nullValue": null,
  "stringer": "another string"
};

const avscTypeSimple = Avro.Type.forValue(dataSimple);
const avscType = Avro.Type.forValue(data);

testLoops('round1-simple', dataSimple, schemaSimple, avscTypeSimple, encoderSimple, decoderSimple);
testLoops('round2-simple', dataSimple, schemaSimple, avscTypeSimple, encoderSimple, decoderSimple);

testLoops('round1', data, schema, avscType, encoder, decoder);
testLoops('round2', data, schema, avscType, encoder, decoder);
