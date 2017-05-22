class Reservations < ActiveRecord::Migration
  def change
	create_table :reservations do |t|
	      t.string :login            
	      t.string :spot_id
	      t.string   :etat
	      t.datetime :time
	      t.string :lat
	      t.string :lon
	      t.string :deviceid
	      t.datetime :modif_date
	      
	end
  end
	  
 
end
