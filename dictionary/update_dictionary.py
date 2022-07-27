
# coding: utf-8

# In[1]:


import pandas as pd
import json
import sys


new_dictionary = pd.read_csv("dictionary_CIMA.csv")

#print("new_dictionary:\n", new_dictionary)

#print("number of rows:", len(new_dictionary))


# In[2]:


#with open("current_dictionary.json") as json_file:
#    data_current = json.load(json_file)
#
#print("data_current:\n", data_current)


# In[3]:

original_stdout = sys.stdout # Save a reference to the original standard output

with open('updated_dictionary.json', 'w') as f:
    sys.stdout = f # Change the standard output to the file we created.

    print("const dictionary = {")
    for index, row in new_dictionary.iterrows():
        #data_current[row['ID']]['en']= row['ENGLISH']
        #data_current[row['ID']]['es']= row['SPANISH']
        #data_current[row['ID']]['gl']= row['GALICIAN']
        #data_current[row['ID']]['is']= row['ICELANDIC']
        #data_current[row['ID']]['pl']= row['POLISH']
        #data_current[row['ID']]['pt']= row['PORTUGUESE']
        #data_current[row['ID']]['uk']= row['UKRAINIAN']
        #print("index:", index)
        #print("row:", row)
        print("  \"" + row['ID'] + "\": {")
        print("    \"en\": \"" + row['ENGLISH'] + "\",")
        print("    \"es\": \"" + row['SPANISH'] + "\",")
        print("    \"gl\": \"" + row['GALICIAN'] + "\",")
        print("    \"is\": \"" + row['ICELANDIC'] + "\",")
        print("    \"pl\": \"" + row['POLISH'] + "\",")
        print("    \"pt\": \"" + row['PORTUGUESE'] + "\",")
        print("    \"uk\": \"" + row['UKRAINIAN'] + "\"")
        if (index == len(new_dictionary) - 1): 
            print("  }")
        else: 
            print("  },")
    print("}")
    sys.stdout = original_stdout # Reset the standard output to its original value


# In[9]:


# data_current['disabled_toilets']


# In[18]:


#with open('updated_dictionary.json', 'w') as outfile:
#    json.dump(data, outfile)

