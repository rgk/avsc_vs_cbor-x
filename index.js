import Avro from '@avro/types';
import { decode, encode, Encoder, Decoder } from 'cbor-x';
import { Buffer } from 'buffer';

(async () => {

  //////////// setup ////////////

  const TIMES_TO_RUN = 1000;

  const data = { key: 1, value: "benchmark", value2: 12 };

  let encoder = new Encoder({ structuredClone: true });
  let decoder = new Decoder({ structuredClone: true});

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

  //////////// avsc-simple ////////////

  serialized = schemaSimple.toBuffer(data);
  deserialized = schemaSimple.fromBuffer(serialized);

  console.time('avsc-simple');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSimple.toBuffer(data);
    deserialized = schemaSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-simple');

  //////////// avsc-super-simple ////////////

  serialized = schemaSuperSimple.toBuffer(data);
  deserialized = schemaSuperSimple.fromBuffer(serialized);

  console.time('avsc-super-simple');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSuperSimple.toBuffer(data);
    deserialized = schemaSuperSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-super-simple');

  //////////// avsc-simple2 ////////////

  serialized = schemaSimple.toBuffer(data);
  deserialized = schemaSimple.fromBuffer(serialized);

  console.time('avsc-simple2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSimple.toBuffer(data);
    deserialized = schemaSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-simple2');

  //////////// avsc-super-simple2 ////////////

  serialized = schemaSuperSimple.toBuffer(data);
  deserialized = schemaSuperSimple.fromBuffer(serialized);

  console.time('avsc-super-simple2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = schemaSuperSimple.toBuffer(data);
    deserialized = schemaSuperSimple.fromBuffer(serialized);
  }

  console.timeEnd('avsc-super-simple2');

  //////////// cbor-x ////////////

  serialized = encode(data);
  deserialized = decode(serialized);

  console.time('cbor-x');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encode(data);
    deserialized = decode(serialized);
  }

  console.timeEnd('cbor-x');

  //////////// cbor-x-encoder ////////////

  serialized = encoder.encode(data);
  deserialized = decoder.decode(serialized);

  console.time('cbor-x-encoder');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encoder.encode(data);
    deserialized = decoder.decode(serialized);
  }

  console.timeEnd('cbor-x-encoder');

  //////////// cbor-x2 ////////////

  serialized = encode(data);
  deserialized = decode(serialized);

  console.time('cbor-x2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encode(data);
    deserialized = decode(serialized);
  }

  console.timeEnd('cbor-x2');

  //////////// cbor-x-encoder2 ////////////

  serialized = encoder.encode(data);
  deserialized = decoder.decode(serialized);

  console.time('cbor-x-encoder2');

  for (let step = 0; step < TIMES_TO_RUN; step++) {
    serialized = encoder.encode(data);
    deserialized = decoder.decode(serialized);
  }

  console.timeEnd('cbor-x-encoder2');
  
})();
