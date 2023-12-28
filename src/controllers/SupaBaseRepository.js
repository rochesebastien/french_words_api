
const { createClient } = require('@supabase/supabase-js');

class SupaBaseRepository {
    db_url
    db_key
    supabase

    constructor(base_url, base_key) {
        this.db_url = base_url
        this.db_key = base_key
        this.supabase = createClient(base_url,base_key)
    }

    async clearWordDay(){
        try {
            const { data, error } = await this.supabase
            .from('day')
            .select('*')
            if (error) {
                console.error('Error deleting day: ', error.message);
                return false;
            }
            if (data) {
                const { deleted_data, deleted_error } = await this.supabase
                .from('day')
                .delete()
                .eq('id', data[0].id)
                if(deleted_error){
                    return false;
                } else {
                    console.log("Deleted day : ",data);
                    return true;
                }        
            }
        } catch (e) {
            console.error('Error clear :', e.message);
            return false;
        }   
    }


    async insertWordDay(new_word) {
        try {
            const { data, error } = await this.supabase
            .from('day')
            .insert([
                { 'word': new_word},
            ])
            .select();
            if (error) {
                console.error('Error inserting day: ', error.message);
            } else {
                console.log('Inserted day: ', data);
                return data
            }
        } catch (e) {
            console.error('Error:', e.message);
        }     
    }

    async getWordDay() {
        try {
            let { data: day, error } = await this.supabase
                .from('day')
                .select('*');
            if (error) {
                console.error('Error fetching day:', error.message);
            } else {
                console.log('Fetched day:', day);
                return day
            }
        } catch (e) {
            console.error('Error:', e.message);
        }
    }
}

module.exports = SupaBaseRepository