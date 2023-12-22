
const { createClient, QueryResult, QueryData, QueryError } = require('@supabase/supabase-js');
// const supabaseUrl = ""
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

class SupaBaseRepository {
    db_url
    db_key
    supabase

    constructor(base_url, base_key) {
        this.supabase = createClient(base_url, base_key)
        this.db_url = base_url
        this.db_key = base_key
        // console.log(this.base_url);
    }

    // getUrl() {
    //     console.log(this.db_url);
    //     return this.db_url
    // }

    // getKey() {
    //     console.log(this.db_url);
    //     return this.db_key
    // }

    async getDay() {
        try {
            let { data, error } = await this.supabase
            .from('day')
            .select('*')          
            console.log(data, error);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = SupaBaseRepository