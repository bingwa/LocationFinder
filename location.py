import folium
from geopy.geocoders import Nominatim
import time
import logging

logging.basicConfig(level=logging.DEBUG)

location_name = input("Enter your location name: ")

geolocator = Nominatim(user_agent="my_location_script_user123")
time.sleep(2)

try:
    location = geolocator.geocode(location_name, country_codes="KE" if "Kenya" in location_name else None)
    if location:

        latitude = location.latitude
        longitude = location.longitude

        map_obj = folium.Map(location=[latitude, longitude], zoom_start=12)

        folium.Marker([latitude, longitude], popup=location_name).add_to(map_obj)

        map_obj.save("map.html")
        print(f"Map has been saved as 'map.html'. Open it in a web browser to view.")

    else:
        print("Location not found.")

except Exception as e:
    print(f"An error occurred: {e}")