/**
 * ID Generator using Twitter snowflakes.
 */
import FlakeId from 'flake-idgen';
import format from 'biguint-format';

/**
 * Generates a IEEE 754-compliant Snowflake converted to decimal. 
 */
export default function idGen (): Number {
    // to keep our functions in the same page, Datacenter is ID 0 and Worker is ID 1.
    // Any deviation can be a bit disastrous since we can have ID mismatches.
    const flakeId = new FlakeId({datacenter: 0, worker: 1});

    return format(flakeId.next(), "dec");
}
