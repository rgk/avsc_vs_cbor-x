import Avro from '@avro/types';
import { decode, encode, Encoder } from 'cbor-x';
import { Buffer } from 'buffer';

(async () => {
  const TIMES_TO_RUN = 1000;

  const data = { key: 1, value: "benchmark", value2: 12 };

  let encoder = new Encoder({ structuredClone: true });

  const schemaSuperSimple = Avro.Type.forSchema({
    name: 'data',
    type: 'record',
    fields: [
      { name: 'key', type: 'int' },
      { name: 'value', type: 'string' },
      { name: 'value2', type: 'int' },
    ]
  });

  const schemaSimple = Avro.Type.forSchema({
    name: 'data',
    type: 'record',
    fields: [
      { name: 'key', type: [ 'string', 'int' ] },
      { name: 'value', type: [ 'string', 'int' ] },
      { name: 'value2', type: [ 'string', 'int' ] },
    ]
  });

  let serialized = Buffer.alloc(1), deserialized = Buffer.alloc(1);

  console.time('avsc-simple');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSimple.toBuffer(data);
    deserialized = schemaSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-simple');

  console.time('avsc-super-simple');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSuperSimple.toBuffer(data);
    deserialized = schemaSuperSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-super-simple');

  console.time('avsc-simple2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSimple.toBuffer(data);
    deserialized = schemaSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-simple2');

  console.time('avsc-super-simple2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSuperSimple.toBuffer(data);
    deserialized = schemaSuperSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-super-simple2');

  console.time('cbor-x');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encode(data);
    deserialized = decode(serialized);
  }

  console.timeEnd('cbor-x');

  console.time('cbor-x-encoder');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encoder.encode(data);
    deserialized = encoder.decode(serialized);
  }

  console.timeEnd('cbor-x-encoder');

  console.time('cbor-x2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encode(data);
    deserialized = decode(serialized);
  }

  console.timeEnd('cbor-x2');

  console.time('cbor-x-encoder2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encoder.encode(data);
    deserialized = encoder.decode(serialized);
  }

  console.timeEnd('cbor-x-encoder2');
})();
