install.packages("pacman")
pacman::p_load("dplyr", "tidyr", "tidycensus", "geojsonio")

# 2020 decennial (DP) housing vacancy percentage by tract
vacancy <- get_decennial("tract", 
              variables = c(housing_vacancy_perc = "DP1_0149P", institutionalized = "DP1_0126P"), 
              sumfile = "dp", 
              year = 2020, 
              state = "DE",output = "wide")

# 2021 ACS median income by tract
medincome <- get_acs(geography = "tract",
                     variables = c(medincome = "B19013_001"),
                     state = "DE",
                     survey = "acs5",
                     year = 2021,
                     output = "wide")

# 2020 decennial (DHC) median age, total population, total housing units per tract 
dhc_vars <- c(median_age = "P13_001N", 
              total_pop = "P1_001N", 
              total_units = "H1_001N")

dhc_stats <- get_decennial("tract", 
            variables = dhc_vars, 
            sumfile = "dhc", 
            year = 2020, 
            geometry = T,
            output = "wide",
            state = "DE") %>% 
    mutate(total_units_per_cap = total_units/total_pop)

# Join all three datasets
data <- dhc_stats %>% 
        dplyr::left_join(medincome, by="GEOID") %>% 
    dplyr::left_join(vacancy, by="GEOID") %>%  
    select(-c("NAME.x", "NAME.y", "medincomeM")) %>% 
    select("NAME", dplyr::everything()) %>% 
    relocate("geometry",.after = "housing_vacancy_perc") %>% 
    rename(medincome = medincomeE) %>%
  filter(!is.na(median_age), GEOID!="10005980000")

places <- readr::read_csv("./tracts2place_2019.csv")
places$GEOID <- as.character(places$GEOID)

data <- data %>% left_join(places, by = "GEOID")

geojsonio::geojson_write(data,file = "./de-data.geojson")
