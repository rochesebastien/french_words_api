
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = ""
const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

class SupaBaseRepository {
    // db_url
    // db_key

    constructor(base_url, base_key) {
        this.supabase = createClient(base_url, base_key)
        this.base_url = base_url
        this.base_key = base_key
        // console.log(this.base_url);
    }

    getUrl() {
        console.log(db_url);
        return this.db_url
    }

    getKey() {
        console.log(db_url);
        return this.db_key
    }
}

module.exports = SupaBaseRepository